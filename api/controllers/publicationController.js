const userModel = require('../models/user/User');
const publicationModel = require('../models/publication/Publication');
const publicationInteractionModel = require('../models/publication/PublicationInteraction');

const createPublication = async (req, res) => {

    try {
        const { fileName, content, userId } = req.body

        if (fileName) {
            let fileplit = fileName.split('\.');
            let extension = fileplit[1];

            if (extension != 'png' && extension != 'jpg' && extension != 'jpeg' && extension != 'gif') {
                fs.unlink(req.file.path, () => {
                    return res.status(400).json({
                        message: "Invalid file"
                    });
                });
            }
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: 'Error',
                message: 'The user does not exist'
            });
        }

        const newPublication = new publicationModel({ userId, author: user.username, description: content, image: fileName })

        newPublication.save()
            .then(() => {
                return res.status(200).json({
                    status: 'Publication dreated successfully',
                    user: user,
                    publication: newPublication
                });
            })
            .catch((error) => {
                console.log(`There was an error: ${error}`);
                throw new Error();
            });

    } catch (error) {
        return res.status(500).json({
            status: `Error -> ${error}`
        });
    }

}

module.exports = {
    createPublication
}