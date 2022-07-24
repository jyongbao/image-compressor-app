import connectDB from "../../middleware/connect-db";
import Image from "../../models/image";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const image = await Image.create(req.body);
      res.json({ image });
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        res.status(400).json({ error });
      } else {
        res.status(400).json({ error });
      }
    }
  } else if (req.method === "GET") {
    const options = {
      page: req.query?.page ?? 1,
      limit: req.query?.limit ?? 10,
    };
    const images = await Image.paginate({}, options);
    res.json(images);
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
