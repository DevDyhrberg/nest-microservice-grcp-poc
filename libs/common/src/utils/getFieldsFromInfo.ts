import { GraphQLResolveInfo } from 'graphql';

export function getFieldsFromInfo(info: GraphQLResolveInfo): string[] {
  const fields =
    info.fieldNodes[0].selectionSet?.selections ??
    []
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .filter((selection: any) => selection.kind === 'Field')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      .map((selection: any) => selection.name.value);
  return fields;
}
