import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Item, { schema } from './model'

const router = new Router()
const { name, subtitle, title1, title2, title3, desciption1, description2, description3, tags, image, cardImg1, cardImg2, cardImg3, userContact } = schema.tree

/**
 * @api {post} /items Create item
 * @apiName CreateItem
 * @apiGroup Item
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Item's name.
 * @apiParam subtitle Item's subtitle.
 * @apiParam title1 Item's title1.
 * @apiParam title2 Item's title2.
 * @apiParam title3 Item's title3.
 * @apiParam desciption1 Item's desciption1.
 * @apiParam description2 Item's description2.
 * @apiParam description3 Item's description3.
 * @apiParam tags Item's tags.
 * @apiParam image Item's image.
 * @apiParam cardImg1 Item's card image 1.
 * @apiParam cardImg2 Item's card image 2.
 * @apiParam cardImg3 Item's card image 3.
 * @apiParam userContact Item's userContact.
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, subtitle, title1, title2, title3, desciption1, description2, description3, tags, image, cardImg1, cardImg2, cardImg3, userContact }),
  create)

/**
 * @api {get} /items Retrieve items
 * @apiName RetrieveItems
 * @apiGroup Item
 * @apiUse listParams
 * @apiSuccess {Object[]} items List of items.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /items/:id Retrieve item
 * @apiName RetrieveItem
 * @apiGroup Item
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /items/:id Update item
 * @apiName UpdateItem
 * @apiGroup Item
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Item's name.
 * @apiParam subtitle Item's subtitle.
 * @apiParam title1 Item's title1.
 * @apiParam title2 Item's title2.
 * @apiParam title3 Item's title3.
 * @apiParam desciption1 Item's desciption1.
 * @apiParam description2 Item's description2.
 * @apiParam description3 Item's description3.
 * @apiParam tags Item's tags.
 * @apiParam image Item's image.
 * @apiParam cardImg1 Item's card image 1.
 * @apiParam cardImg2 Item's card image 2.
 * @apiParam cardImg3 Item's card image 3.
 * @apiParam userContact Item's userContact.
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, subtitle, title1, title2, title3, desciption1, description2, description3, tags, image, cardImg1, cardImg2, cardImg3, userContact }),
  update)

/**
 * @api {delete} /items/:id Delete item
 * @apiName DeleteItem
 * @apiGroup Item
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Item not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
