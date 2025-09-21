import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import db from "../models/index";
import chothuenhao from "../../data/chothuenhao.json";
import { generateCode } from "../ultis/generateCode";

const dataBody = chothuenhao.body


export const insertService = () => new Promise( async (resolve, reject) => {
    try {
        dataBody.forEach( async (item) => {
            const attributesId = v4();
            const imagesId = v4();
            const overviewId = v4();
            const userId = v4();
            await db.Post.create({
                id : v4(),
                title : item.header.title,
                star : item.header.star.slice(-1),
                labelCode : generateCode(10),
                address : item.header.address,
                attributesId :attributesId,
                categoryCode : "CTNO",
                description : JSON.stringify(item.mainContent),
                userId : userId,
                overviewId : overviewId,
                imagesId : imagesId,
            })

            await db.Attribute.create({     
                id : attributesId,
                price : item.header.attributes.price,
                acreage : item.header.attributes.acreage,
                pushlished : item.header.attributes.publisher,
                hashtag : item.header.attributes.hashtag,
            })

            await db.Image.create({
                id : imagesId,
                image : JSON.stringify(item.images),
            })

            await db.Label.create({
                code : "CTNO",
                value : "Cho thuê nhà nguyên căn",
            })

            await db.Overview.create({
                code : item.overviewContent[3][1],
                area : item.overviewContent[1][1],
                type : "Cho thuê nhà nguyên căn",
                target : "Nam/Nữ",
                bonus : "Tin VIP nổi bật",
                created : item.overviewContent[4][1],
                expired : item.overviewContent[5][1]
            })

            await db.User.create({
                id : userId,
                name : item.contact.name,
                password : bcrypt.hashSync("123456", 8),
                phone : item.contact.phone,
                zalo : item.contact.zalo
            })
        });

        resolve("Done")
    } catch (error) {
        console.log(error);
        reject(error);
    }
});