import { Link } from '.'

let link

beforeEach(async () => {
  link = await Link.create({ name: 'test', description: 'test', items: 'test', userContact: 'test', extension: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = link.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(link.id)
    expect(view.name).toBe(link.name)
    expect(view.description).toBe(link.description)
    expect(view.items).toBe(link.items)
    expect(view.userContact).toBe(link.userContact)
    expect(view.extension).toBe(link.extension)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = link.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(link.id)
    expect(view.name).toBe(link.name)
    expect(view.description).toBe(link.description)
    expect(view.items).toBe(link.items)
    expect(view.userContact).toBe(link.userContact)
    expect(view.extension).toBe(link.extension)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
