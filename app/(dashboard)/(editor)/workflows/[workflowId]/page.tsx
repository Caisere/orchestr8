export default async function WorkflowEditorPage({
  params,
}: {
  params: Promise<{ workflowId: string }>
}) {
  const { workflowId } = await params

  return (
    <div>
      <p>Workflow: {workflowId}</p>
    </div>
  )
}
