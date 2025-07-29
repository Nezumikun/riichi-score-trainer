export default defineEventHandler(async (event) => {
  console.log(event);
  const data = await useStorage('assets:server').getItem(`data/meta.json`)
  return data
})