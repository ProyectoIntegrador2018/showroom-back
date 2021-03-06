import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Link, { schema } from './model'

const router = new Router()
const { name, description, items, userContact, clientName, extension, statTitle1, statTitle2, statTitle3, statValue1, statValue2, statValue3, categories } = schema.tree

/**
 * @api {post} /links Create link
 * @apiName CreateLink
 * @apiGroup Link
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Link's name.
 * @apiParam description Link's description.
 * @apiParam items Link's items.
 * @apiParam userContact Link's userContact.
 * @apiParam clientName Link's clientName.
 * @apiParam extension Link's extension.
 * @apiParam statTitle1 Link's statistic 1 title.
 * @apiParam statTitle2 Link's statistic 2 title.
 * @apiParam statTitle3 Link's statistic 3 title.
 * @apiParam statValue1 Link's statistic 1 value.
 * @apiParam statValue2 Link's statistic 2 value.
 * @apiParam statValue3 Link's statistic 3 value.
 * @apiParam categories Link's categories.
 * @apiSuccess {Object} link Link's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Link not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, description, items, userContact, clientName, extension, statTitle1, statTitle2, statTitle3, statValue1, statValue2, statValue3, categories }),
  create)

/**
 * @api {get} /links Retrieve links
 * @apiName RetrieveLinks
 * @apiGroup Link
 * @apiUse listParams
 * @apiSuccess {Object[]} links List of links.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /links/:id Retrieve link
 * @apiName RetrieveLink
 * @apiGroup Link
 * @apiSuccess {Object} link Link's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Link not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /links/:id Update link
 * @apiName UpdateLink
 * @apiGroup Link
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Link's name.
 * @apiParam description Link's description.
 * @apiParam items Link's items.
 * @apiParam userContact Link's userContact.
 * @apiParam clientName Link's clientName.
 * @apiParam extension Link's extension.
 * @apiParam statTitle1 Link's statistic 1 title.
 * @apiParam statTitle2 Link's statistic 2 title.
 * @apiParam statTitle3 Link's statistic 3 title.
 * @apiParam statValue1 Link's statistic 1 value.
 * @apiParam statValue2 Link's statistic 2 value.
 * @apiParam statValue3 Link's statistic 3 value.
 * @apiParam categories Link's categories.
 * @apiSuccess {Object} link Link's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Link not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, description, items, userContact, clientName, extension, statTitle1, statTitle2, statTitle3, statValue1, statValue2, statValue3, categories }),
  update)

/**
 * @api {delete} /links/:id Delete link
 * @apiName DeleteLink
 * @apiGroup Link
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Link not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
