import Router from 'koa-router';

import AuthContoller from './../controllers/auth.controller';
import ExampleContoller from './../controllers/example.controller';

const publicRouter = new Router();

publicRouter

  /* CUSTOM AUTH ROUTES
   auth controller make basik authorization by email/password
   - basic sign in with login and password
   - basic sign up with user data.Data example look at README.MD
   - refresh JWT Token
  */
  .post('/auth/signin', AuthContoller.signIn)
  .post('/auth/signup', AuthContoller.signUp)
  .post('/auth/refreshtoken', AuthContoller.refreshJWTToken)

  /* CUSTOM FILE UPLOAD ROUTES
    example controller show work of custom methods
    - get full path to file on server by its name
    - upload file or file on server
    - check if file exist on server
    - delete file from server
  */
  .get('/file/fullpath/:path', ExampleContoller.filePath)
  .get('/file/exist/:path', ExampleContoller.fileExist)
  .post('/file/upload', ExampleContoller.fileUpload)
  .delete('/file/delete', ExampleContoller.fileDelete)

  // EXAMPLE OF PUBLIC ROUTE
  .get('/public/route', ExampleContoller.testpublic);

export default publicRouter;
