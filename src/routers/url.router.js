import { Router } from "express";
import { deleteUrl, getMyUrls, getUrlById, redirectToUrl, shortenUrl } from "../controllers/url.controller.js";
import { validateId, validateShortUrl, validateUrl } from "../middlewares/url.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/url.schemas.js";

const urlRouter = Router()
urlRouter.get("/urls/:id", validateId, getUrlById)
urlRouter.get("/urls/open/:shortUrl", validateShortUrl, redirectToUrl)
urlRouter.delete("/urls/:id", authValidation, validateId, validateUrl, deleteUrl)
urlRouter.get("/users/me", authValidation, getMyUrls)
urlRouter.post("/urls/shorten", validateSchema(urlSchema), authValidation, shortenUrl)

export default urlRouter