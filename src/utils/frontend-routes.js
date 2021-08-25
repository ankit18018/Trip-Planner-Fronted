export default class FrontendRoutes {
    static loginRoute = '/login';
    static signupRoute = '/signup';
    static tripsRoute = '/trips';
    static usersRoute = '/users'
    static defaultRoute = '/';
    static createUserRoute = '/users/create';
    static updateUserRoute =  (id=':id') => (`/users/update/${id}`);
    static viewUserRoute = (id=':id') => (`/users/views/${id}`);
    static createTripRoute = '/trips/create';
    static updateTripRoute = (id=':id') => ( `/trips/update/${id}`);
    static viewTripRoute = (id=':id') => (`/trips/views/${id}`)
}