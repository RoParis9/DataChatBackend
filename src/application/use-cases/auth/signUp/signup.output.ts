export interface SignUpOutput {
  user: {
    id: string
    name: string
    email: string
    role: string
    companyId: string
  }
  accessToken: string
}
