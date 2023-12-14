import express,{Application} from 'express'
import { AdminRouter, VandorRouter,CustomerRoute ,ShoppingRoute} from '../routes'
import path from 'path';

export default async (app: Application) => {

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/coverimages", express.static(path.join(__dirname, "coverimages")));

app.use("/admin", AdminRouter);
    app.use("/vandor", VandorRouter);
    app.use("/customer",CustomerRoute)
app.use(ShoppingRoute);
    
    return app
}



