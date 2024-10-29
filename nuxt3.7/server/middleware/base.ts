export default defineEventHandler(({node}) => {
  const ip = node.req.headers['x-forwarded-for']
  // console.warn(`request ip: ${ip}`)
})