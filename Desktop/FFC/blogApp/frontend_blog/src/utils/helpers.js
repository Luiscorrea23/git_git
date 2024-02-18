import * as services from './services/routes_services'; 

const like = async (blog, id) => {
    const updatedBlog = [...blog, {likes: blog.like + 1}]
    const response = await services.updateData(services, updatedBlog)
    blog = response.data
}