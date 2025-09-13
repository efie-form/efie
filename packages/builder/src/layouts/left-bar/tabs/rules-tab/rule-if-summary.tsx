import { type ConditionNode, type ConditionTree, type Operand, Operator } from '@efie-form/core';
import { AiFillCaretRight } from 'react-icons/ai';
import { useSchemaStore } from '../../../../lib/state/schema.state';

const LOGIC_LABEL = {
  all: 'ALL of:',
  any: 'ANY of:',
} as const;

const OPERATOR_LABEL: Record<Operator, string> = {
  [Operator.EQUAL]: '=',
  [Operator.NOT_EQUAL]: '!=',
  [Operator.CONTAINS]: 'contains',
  [Operator.NOT_CONTAINS]: 'not contains',
  [Operator.STARTS_WITH]: 'starts with',
  [Operator.NOT_STARTS_WITH]: 'not starts with',
  [Operator.ENDS_WITH]: 'ends with',
  [Operator.NOT_ENDS_WITH]: 'not ends with',
  [Operator.GREATER_THAN]: '>',
  [Operator.GREATER_THAN_OR_EQUAL]: '>=',
  [Operator.LESS_THAN]: '<',
  [Operator.LESS_THAN_OR_EQUAL]: '<=',
  [Operator.IS_FILLED]: 'is filled',
  [Operator.IS_EMPTY]: 'is empty',
  [Operator.IS_VALID]: 'is valid',
  [Operator.IS_INVALID]: 'is invalid',
  [Operator.IN]: 'in',
  [Operator.NOT_IN]: 'not in',
  [Operator.BETWEEN]: 'between',
  [Operator.BEFORE]: 'before',
  [Operator.AFTER]: 'after',
  [Operator.ON_OR_BEFORE]: 'on or before',
  [Operator.ON_OR_AFTER]: 'on or after',
  [Operator.IS_TRUE]: 'is true',
  [Operator.IS_FALSE]: 'is false',
  [Operator.PHONE_COUNTRY_IN]: 'phone country in',
  [Operator.PHONE_COUNTRY_NOT_IN]: 'phone country not in',
  [Operator.EMAIL_DOMAIN_IN]: 'email domain in',
  [Operator.EMAIL_DOMAIN_NOT_IN]: 'email domain not in',
  [Operator.ADDRESS_CITY_IN]: 'address city in',
  [Operator.ADDRESS_CITY_NOT_IN]: 'address city not in',
  [Operator.ADDRESS_STATE_IN]: 'address state in',
  [Operator.ADDRESS_STATE_NOT_IN]: 'address state not in',
  [Operator.ADDRESS_POSTAL_CODE_IN]: 'address postal code in',
  [Operator.ADDRESS_POSTAL_CODE_NOT_IN]: 'address postal code not in',
  [Operator.ADDRESS_COUNTRY_IN]: 'address country in',
  [Operator.ADDRESS_COUNTRY_NOT_IN]: 'address country not in',
};

interface RuleIfSummaryProps {
  tree: ConditionTree;
}

export default function RuleIfSummary({ tree }: RuleIfSummaryProps) {
  return <TreeChild node={tree} isRoot />;
}

interface TreeChildProps {
  node: ConditionTree | ConditionNode;
  isRoot?: boolean;
}

function TreeChild({ node, isRoot }: TreeChildProps) {
  if ('children' in node) {
    return (
      <>
        <div className="flex gap-2 typography-body3">
          {isRoot ? (
            <span className="me-1 rounded-sm bg-neutral-200 px-1 py-0.5 text-neutral-700 uppercase">
              If
            </span>
          ) : (
            <span className="text-neutral-500">
              <AiFillCaretRight className="size-3 mt-0.5" />
            </span>
          )}
          <p className="font-medium text-neutral-600">{LOGIC_LABEL[node.logic]}</p>
        </div>
        {node.children.map((child, index) => (
          <div key={index} className="ms-2 mt-1">
            <TreeChild node={child} />
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="flex gap-2 items-start typography-body3">
      <span className="text-neutral-500">
        <AiFillCaretRight className="size-3 mt-0.5" />
      </span>
      <p className="space-x-1">
        <NodeItem node={node} />
        {node.operator && <span className="text-neutral-500">{OPERATOR_LABEL[node.operator]}</span>}
        <NodeValue operand={node.right} />
      </p>
    </div>
  );
}

interface NodeItemProps {
  node: ConditionNode;
}

function NodeItem({ node }: NodeItemProps) {
  switch (node.left?.kind) {
    case 'fieldValue':
      return <NodeFieldValue fieldId={node.left.field} />;
  }

  return <span className="">{node.left?.kind}</span>;
}

interface NodeFieldValueProps {
  fieldId: string;
}

function NodeFieldValue({ fieldId }: NodeFieldValueProps) {
  const field = useSchemaStore((s) => s.getFieldById(fieldId));
  if (!field) return null;

  return (
    <span className="font-medium text-primary-700 bg-primary-200 p-0.5 rounded-sm">
      {field.sys.name}
    </span>
  );
}

interface NodeValueProps {
  operand?: Operand | Operand[];
}

function NodeValue({ operand }: NodeValueProps) {
  if (!operand) return null;
  if (Array.isArray(operand)) {
    return (
      <span className="">
        {operand.map((value, index) => (
          <>
            <NodeValueItem key={index} operand={value} />
            {index < operand.length - 1 && <span className="">, </span>}
          </>
        ))}
      </span>
    );
  }
  return <NodeValueItem operand={operand} />;
}

interface NodeValueItemProps {
  operand: Operand;
}

function NodeValueItem({ operand }: NodeValueItemProps) {
  switch (operand.kind) {
    case 'constant':
      return <span className="text-neutral-800">{operand.value}</span>;
  }
  return <span className="">{operand.kind}</span>;
}
