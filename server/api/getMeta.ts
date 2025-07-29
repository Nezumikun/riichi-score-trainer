export default defineEventHandler(async () => {
  const data = await useStorage('assets:server').getItem(`data/meta.json`)
  return data
})