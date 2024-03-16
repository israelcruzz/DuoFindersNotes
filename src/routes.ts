import { Router } from "express";
import { authApp } from "./middlewares/auth";

import NotesController from "./controllers/notesController";
import SessionController from "./controllers/sessionController";
import TagsController from "./controllers/tagsController";
import UserAvatarController from "./controllers/userAvatarController";
import UserController from "./controllers/userController";
import { storage } from "./config/multer";
import multer from "multer";

const upload = multer({ storage: storage })
export const route = Router();

route.post("/session", SessionController.create);
route.post("/users", UserController.create);

route.use(authApp);

route.put("/users", UserController.update);
route.get("/users", UserController.show);

route.get("/notes", NotesController.index);
route.post("/notes", NotesController.store);
route.delete("/notes/:id", NotesController.delete);
route.get("/notes/:id", NotesController.show);

route.get("/tags", TagsController.index);

route.patch("/users/avatar", upload.single('avatar'), UserAvatarController.update);