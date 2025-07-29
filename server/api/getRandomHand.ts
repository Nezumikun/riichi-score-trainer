export default defineEventHandler(async () => {
  const list = await useStorage('assets:server').getItem<string[]>(`data/meta.json`) || []
  const index = Math.floor(Math.random() * list.length);
  const fileName = '2011010100gm-00e1-0000-f8d4dec25' + '.json'
  //const fileName = list[index]
  const data = await useStorage('assets:server').getItem<object>(`data/` + fileName)
  // console.log(index, list[index], data)
  return {
    index: index,
    fileName: list[index],
    data: data
  };
})