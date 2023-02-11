const { writeFile, rm, exists, mkdir } = require('fs');
const { readFile } = require('fs/promises');

/**
 * Disk service for all file operations
 */
class diskService {
  /**
   * Read file on disk
   * @param {String} path
   * @returns {Promise<Buffer>}
   */
  static async readFileOnDisk(path) {
    return await readFile(path, function (error, data) {
      if (error) {
        throw error;
      } else {
        console.log(data);
      }
    });
  }

  /**
   * Write file on disk
   * @param {String} path
   * @param {Buffer} content
   * @returns {Promise<void>}
   */
  static async writeFileOnDisk(path, content) {
    writeFile(path, content, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }

  /**
   * Delete file on disk
   * @param {String} path
   * @returns {Promise<void>}
   */
  static async deleteFileOnDisk(path) {
    rm(path, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }

  /**
   * Check if directory exists
   * @param {String} path
   * @returns {Promise<void>}
   */
  static async checkDirectory(path) {
    // Check if directory exists
    return exists(path, (exists) => {
      console.debug('Directory exists: ' + exists);
      return exists;
    });
  }

  /**
   * Create directory
   * @param {String} path
   * @returns {Promise<void>}
   */
  static async createDirectory(path) {
    mkdir(path, () => {
      // Ignore error
    });
  }

  /**
   * Check if directory exists, if not create it
   * @param {String} path
   * @returns {Promise<void>}
   */
  static async checkAndCreateDirectory(path) {
    const exists = await this.checkDirectory(path);
    if (!exists) {
      console.log('Directory does not exist, creating it...');
      await this.createDirectory(path);
    }
  }
}

module.exports = diskService;
