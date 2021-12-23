export function getActionUpstairUrl(
  action: string | string[],
  segment?: string
): string {
  return `portofino-upstairs/actions/${action}/${segment || ""}`
    .split("/")
    .filter((x) => x)
    .join("/")
    .toLowerCase();
}
