import { Schema, model, models, Document } from "mongoose"

export interface ICategory extends Document {
  name: string
  description?: string
  slug?: string
  icon?: string
  color?: string
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    icon: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "#6366f1",
    },
  },
  { timestamps: true }
)
const Category = models.Category || model<ICategory>("Category", CategorySchema);

export default Category;