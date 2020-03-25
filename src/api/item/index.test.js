import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Item } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, item

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  item = await Item.create({})
})

test('POST /items 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', subtitle: 'test', title1: 'test', title2: 'test', title3: 'test', desciption1: 'test', description2: 'test', description3: 'test', tags: 'test', image: 'test', userContact: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.subtitle).toEqual('test')
  expect(body.title1).toEqual('test')
  expect(body.title2).toEqual('test')
  expect(body.title3).toEqual('test')
  expect(body.desciption1).toEqual('test')
  expect(body.description2).toEqual('test')
  expect(body.description3).toEqual('test')
  expect(body.tags).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.userContact).toEqual('test')
})

test('POST /items 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /items 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /items 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /items/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${item.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(item.id)
})

test('GET /items/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /items/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${item.id}`)
    .send({ access_token: adminSession, name: 'test', subtitle: 'test', title1: 'test', title2: 'test', title3: 'test', desciption1: 'test', description2: 'test', description3: 'test', tags: 'test', image: 'test', userContact: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(item.id)
  expect(body.name).toEqual('test')
  expect(body.subtitle).toEqual('test')
  expect(body.title1).toEqual('test')
  expect(body.title2).toEqual('test')
  expect(body.title3).toEqual('test')
  expect(body.desciption1).toEqual('test')
  expect(body.description2).toEqual('test')
  expect(body.description3).toEqual('test')
  expect(body.tags).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.userContact).toEqual('test')
})

test('PUT /items/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${item.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /items/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${item.id}`)
  expect(status).toBe(401)
})

test('PUT /items/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', subtitle: 'test', title1: 'test', title2: 'test', title3: 'test', desciption1: 'test', description2: 'test', description3: 'test', tags: 'test', image: 'test', userContact: 'test' })
  expect(status).toBe(404)
})

test('DELETE /items/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${item.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /items/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${item.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /items/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${item.id}`)
  expect(status).toBe(401)
})

test('DELETE /items/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
