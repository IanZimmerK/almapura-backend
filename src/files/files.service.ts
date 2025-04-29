import { Injectable } from '@nestjs/common';
import { ensureDir, writeFile, unlink } from 'fs-extra';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  private readonly uploadDir = join(__dirname, '..', '..', 'uploads');

  async saveFile(file: Express.Multer.File): Promise<string> {
    await ensureDir(this.uploadDir);
    const fileExt = file.originalname.substring(file.originalname.lastIndexOf('.'));
    const fileName = `${uuidv4()}${fileExt}`;
    const filePath = join(this.uploadDir, fileName);
    await writeFile(filePath, file.buffer);
    return `/uploads/${fileName}`;
  }

  async deleteFile(imagePath: string): Promise<void> {
    if (!imagePath) return;
    const fullPath = join(this.uploadDir, imagePath.replace('/uploads/', ''));
    try {
      await unlink(fullPath);
    } catch (err) {
      console.error(`Error deleting file ${imagePath}:`, err);
    }
  }
}