/**
 * Created by YOU on 2017/12/14.
 */
module.exports = (Schema) => {
  console.log('Model article create!')
  return {
    title: String,
    content: String,
    author: Schema.Types.ObjectId,
    createTime: Date,
  }
}