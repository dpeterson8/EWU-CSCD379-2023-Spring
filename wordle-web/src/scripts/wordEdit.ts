export class WordListOptions {
  pageSize: number = 10
  pageNumber: number = 0
  search: string = ''
}

export class WordListItem {
  wordId: number = 0
  test: string = ''
  isCommon: boolean = false
  isUsed: boolean = false
}
