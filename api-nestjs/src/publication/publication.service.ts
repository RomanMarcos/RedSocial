import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Publication } from './publication.schema';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
const fs = require('fs');

@Injectable()
export class PublicationService {
    constructor(
        @InjectModel(Publication.name) private publicationModel: Model<Publication>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async newPublication(req, res): Promise<object> {
        try {
            const { fileName, content, userId } = req.body

            if (fileName) {
                let fileplit = fileName.split('\.');
                let extension = fileplit[1];

                if (extension != 'png' && extension != 'jpg' && extension != 'jpeg' && extension != 'gif') {
                    return res.status(400).json({
                        message: "Invalid file"
                    });
                }
            }

            const user = await this.userModel.findById(userId);

            if (!user) {
                return res.status(404).json({
                    status: 'Error',
                    message: 'The user does not exist'
                });
            }

            const newPublication = new this.publicationModel({ userId, author: user.username, description: content, image: fileName })

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

    async removePublication(req, res): Promise<object> {
        try {
            const { id } = req.params;

            this.publicationModel.deleteOne({ _id: id })
                .then(() => {
                    return res.status(200).json({
                        status: 'Success',
                        message: 'The publication was successfully removed from the database..'
                    });
                })
                .catch(() => {
                    return res.status(404).json({
                        status: 'Error',
                        message: 'There was an error trying to delete the publication..'
                    });
                });

        } catch (error) {
            return res.status(500).json({
                status: `Error -> ${error}`
            });
        }
    }
}
