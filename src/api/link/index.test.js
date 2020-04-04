import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Link } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, link

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  link = await Link.create({})
})

test('POST /links 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', description: 'test', items: 'test', userContact: 'test', extension: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.items).toEqual('test')
  expect(body.userContact).toEqual('test')
  expect(body.extension).toEqual('test')
})

test('POST /links 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /links 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /links 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /links/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${link.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(link.id)
})

test('GET /links/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /links/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${link.id}`)
    .send({ access_token: adminSession, name: 'test', description: 'test', items: 'test', userContact: 'test', extension: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(link.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.items).toEqual('test')
  expect(body.userContact).toEqual('test')
  expect(body.extension).toEqual('test')
})

test('PUT /links/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${link.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /links/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${link.id}`)
  expect(status).toBe(401)
})

test('PUT /links/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', description: 'test', items: 'test', userContact: 'test', extension: 'test' })
  expect(status).toBe(404)
})

test('DELETE /links/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${link.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /links/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${link.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /links/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${link.id}`)
  expect(status).toBe(401)
})

test('DELETE /links/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
