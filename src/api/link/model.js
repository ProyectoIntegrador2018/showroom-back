import mongoose, { Schema } from 'mongoose'

const linkSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  items: [{
    type: Schema.ObjectId,
    ref: 'Item'
  }],
  userContact: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  extension: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

linkSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      items: this.items,
      userContact: this.userContact,
      extension: this.extension,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Link', linkSchema)

export const schema = model.schema
export default model
