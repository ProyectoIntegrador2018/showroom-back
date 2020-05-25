import mongoose, { Schema } from 'mongoose'

const itemSchema = new Schema({
  name: {
    type: String
  },
  subtitle: {
    type: String
  },
  title1: {
    type: String
  },
  title2: {
    type: String
  },
  title3: {
    type: String
  },
  desciption1: {
    type: String
  },
  description2: {
    type: String
  },
  description3: {
    type: String
  },
  tags: {
    type: [String]
  },
  image: {
    type: String
  },
  cardImg1: {
    type: String
  },
  cardImg2: {
    type: String
  },
  cardImg3: {
    type: String
  },
  userContact: {
    type: Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

itemSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      subtitle: this.subtitle,
      title1: this.title1,
      title2: this.title2,
      title3: this.title3,
      desciption1: this.desciption1,
      description2: this.description2,
      description3: this.description3,
      tags: this.tags,
      image: this.image,
      cardImg1: this.cardImg1,
      cardImg2: this.cardImg2,
      cardImg3: this.cardImg3,
      userContact: this.userContact,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Item', itemSchema)

export const schema = model.schema
export default model