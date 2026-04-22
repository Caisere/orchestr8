export default async function ExecutionPage({
  params,
}: {
  params: Promise<{ executionId: string }>
}) {
  const { executionId } = await params

  return (
    <div>
      <p>Execution: {executionId}</p>
    </div>
  )
}
