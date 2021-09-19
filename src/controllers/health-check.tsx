export async function requestHealthCheck(context) {
  context.body = "Health!";
  return context;
}
