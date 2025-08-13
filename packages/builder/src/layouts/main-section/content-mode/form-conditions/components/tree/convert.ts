import type { ConditionNode, ConditionTree, Operand, Operator } from '@efie-form/core';
import { operatorNeedsNoValue } from '../../value-editors/common';
import type { ConditionTreeUI } from './condition-group';
import type { ConditionNodeUI } from './condition-node';

function isGroupEngine(node: ConditionTree | ConditionNode): node is ConditionTree {
  return (
    (node as ConditionTree).logic !== undefined && Array.isArray((node as ConditionTree).children)
  );
}

function isGroupUI(node: ConditionTreeUI | ConditionNodeUI): node is ConditionTreeUI {
  return (
    (node as ConditionTreeUI).logic !== undefined &&
    Array.isArray((node as ConditionTreeUI).children)
  );
}

function toConstantOperand(value: unknown): Operand {
  // JsonValue is broad; at UI layer we accept unknown and pass through
  return { kind: 'constant', value: value as never };
}

export function toUi(tree: ConditionTree | undefined): ConditionTreeUI {
  if (!tree) return { logic: 'all', children: [] };
  if (isGroupEngine(tree)) {
    return {
      logic: tree.logic === 'and' ? 'all' : 'any',
      children: tree.children.map(mapEngineNodeToUi),
    };
  }
  // if accidentally a node passed, wrap into an AND group
  return { logic: 'all', children: [mapEngineNodeToUi(tree)] };
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
    return {
      logic: ui.logic === 'all' ? 'and' : 'or',
      children: ui.children.map(mapUiNodeToEngine),
    };
  }
  // fallback empty group
  return { logic: 'and', children: [] };
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
