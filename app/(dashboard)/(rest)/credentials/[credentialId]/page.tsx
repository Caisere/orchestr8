export default async function CredentialPage({
  params,
}: {
  params: Promise<{ credentialId: string }>
}) {
  const { credentialId } = await params

  return (
    <div>
      <p>Credential: {credentialId}</p>
    </div>
  )
}
