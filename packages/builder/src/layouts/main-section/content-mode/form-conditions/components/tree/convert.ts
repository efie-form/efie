import type { ConditionNode, ConditionTree, Operand, Operator } from '@efie-form/core';
import { operatorNeedsNoValue } from '../../value-editors/common';
import type { ConditionTreeUI } from './condition-group';
import type { ConditionNodeUI } from './condition-node';

function isGroupEngine(node: ConditionTree | ConditionNode): node is ConditionTree {
  return (
    (node as ConditionTree).all !== undefined ||
    (node as ConditionTree).any !== undefined ||
    (node as ConditionTree).not !== undefined
  );
}

function isGroupUI(node: ConditionTreeUI | ConditionNodeUI): node is ConditionTreeUI {
  return (
    !!(node as ConditionTreeUI).all ||
    !!(node as ConditionTreeUI).any ||
    !!(node as ConditionTreeUI).not
  );
}

function toConstantOperand(value: unknown): Operand {
  // JsonValue is broad; at UI layer we accept unknown and pass through
  return { kind: 'constant', value: value as never };
}

export function toUi(tree: ConditionTree | undefined): ConditionTreeUI {
  if (!tree) return { all: [] };
  if (isGroupEngine(tree)) {
    if (tree.all) return { all: tree.all.map(mapEngineNodeToUi) };
    if (tree.any) return { any: tree.any.map(mapEngineNodeToUi) };
    if (tree.not) return { not: toUi(tree.not) };
    return { all: [] };
  }
  // if accidentally a node passed, wrap into an AND group
  return { all: [mapEngineNodeToUi(tree)] };
}

function mapEngineNodeToUi(node: ConditionTree | ConditionNode): ConditionTreeUI | ConditionNodeUI {
  if (isGroupEngine(node)) return toUi(node);
  const leftField = node.left.kind === 'fieldValue' ? node.left.field : '';
  let rightValue: unknown;
  if (Array.isArray(node.right)) {
    // map array of constants to raw values; otherwise leave undefined
    const vals = node.right
      .map((op) =>
        op && typeof op === 'object' && 'kind' in op && (op as Operand).kind === 'constant'
          ? (op as Extract<Operand, { kind: 'constant' }>).value
          : undefined,
      )
      .filter((v) => v !== undefined);
    rightValue = vals.length ? vals : undefined;
  } else if (node.right && typeof node.right === 'object' && 'kind' in node.right) {
    const r = node.right as Operand;
    if (r.kind === 'constant') rightValue = (r as Extract<Operand, { kind: 'constant' }>).value;
  }
  return {
    left: { kind: 'fieldValue', field: leftField },
    operator: node.operator as Operator,
    right: rightValue,
  };
}

export function toEngine(ui: ConditionTreeUI): ConditionTree {
  if (isGroupUI(ui)) {
    if (ui.all) return { all: ui.all.map(mapUiNodeToEngine) } as ConditionTree;
    if (ui.any) return { any: ui.any.map(mapUiNodeToEngine) } as ConditionTree;
    if (ui.not) return { not: toEngine(ui.not) } as ConditionTree;
  }
  // fallback
  return { all: [] };
}

function mapUiNodeToEngine(node: ConditionTreeUI | ConditionNodeUI): ConditionTree | ConditionNode {
  if (isGroupUI(node)) return toEngine(node);
  const op = node.operator as Operator;
  const needsValue = !operatorNeedsNoValue(op);
  let right: Operand | Operand[] | undefined;

  if (needsValue) {
    if (Array.isArray(node.right)) {
      right = (node.right as unknown[]).map((v) => toConstantOperand(v));
    } else if (node.right !== undefined) {
      right = toConstantOperand(node.right);
    }
  }
  return {
    left: { kind: 'fieldValue', field: node.left.field },
    operator: op,
    right,
  } as ConditionNode;
}
