import { success, notFound } from '../../services/response/'
import { Link } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Link.create(body)
    .then((link) => link.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Link.find(query, select, cursor)
    .populate('userContact items')
    .then((links) => links.map((link) => link.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Link.findById(params.id)
    .populate('userContact items')
    .then(notFound(res))
    .then((link) => link ? link.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Link.findById(params.id)
    .then(notFound(res))
    .then((link) => link ? Object.assign(link, body).save() : null)
    .then((link) => link ? link.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Link.findById(params.id)
    .then(notFound(res))
    .then((link) => link ? link.remove() : null)
    .then(success(res, 204))
    .catch(next)
