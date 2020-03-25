import { Item } from '.'

let item

beforeEach(async () => {
  item = await Item.create({ name: 'test', subtitle: 'test', title1: 'test', title2: 'test', title3: 'test', desciption1: 'test', description2: 'test', description3: 'test', tags: 'test', image: 'test', userContact: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = item.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(item.id)
    expect(view.name).toBe(item.name)
    expect(view.subtitle).toBe(item.subtitle)
    expect(view.title1).toBe(item.title1)
    expect(view.title2).toBe(item.title2)
    expect(view.title3).toBe(item.title3)
    expect(view.desciption1).toBe(item.desciption1)
    expect(view.description2).toBe(item.description2)
    expect(view.description3).toBe(item.description3)
    expect(view.tags).toBe(item.tags)
    expect(view.image).toBe(item.image)
    expect(view.userContact).toBe(item.userContact)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = item.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(item.id)
    expect(view.name).toBe(item.name)
    expect(view.subtitle).toBe(item.subtitle)
    expect(view.title1).toBe(item.title1)
    expect(view.title2).toBe(item.title2)
    expect(view.title3).toBe(item.title3)
    expect(view.desciption1).toBe(item.desciption1)
    expect(view.description2).toBe(item.description2)
    expect(view.description3).toBe(item.description3)
    expect(view.tags).toBe(item.tags)
    expect(view.image).toBe(item.image)
    expect(view.userContact).toBe(item.userContact)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
