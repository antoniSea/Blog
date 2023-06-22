const resource = (router, path, controller) => {
    router.get(`/${path}`, controller.index);
    router.get(`/${path}/:id`, controller.show);
    router.post(`/${path}`, controller.store);
    router.put(`/${path}/:id`, controller.update);
    router.delete(`/${path}/:id`, controller.destroy);
}

export default resource;
