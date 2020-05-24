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
  },
  clientName: {
    type: String
  },
  statTitle1: {
    type: String
  },
  statTitle2: {
    type: String
  },
  statTitle3: {
    type: String
  },
  statValue1: {
    type: String
  },
  statValue2: {
    type: String
  },
  statValue3: {
    type: String
  },
  categories: {
    type: [String]
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
      clientName: this.clientName,
      extension: this.extension,
      statTitle1: this.statTitle1,
      statTitle2: this.statTitle2,
      statTitle3: this.statTitle3,
      statValue1: this.statValue1,
      statValue2: this.statValue2,
      statValue3: this.statValue3,
      categories: this.categories,
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
