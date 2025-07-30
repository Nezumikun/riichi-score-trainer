export default defineEventHandler(async () => {
  const list = await useStorage('assets:server').getItem<string[]>(`data/meta.json`) || []
  const index = Math.floor(Math.random() * list.length);
  // const fileName = '2011010111gm-00a9-0000-72da92c45' + '.json'
  const fileName = list[index]
  const data = await useStorage('assets:server').getItem<object>(`data/` + fileName)
  // console.log(index, list[index], data)
  return {
    index: index,
    fileName: list[index],
    tenhouHand: data
  };
})