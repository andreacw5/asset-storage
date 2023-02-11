const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Handle all database related operations
 */
class databaseService {
  /**
   * Return all assets
   * @param {Number} offset
   * @param {Number} limit
   * @returns {Promise<Object[]>}
   */
  static async getAllAssets(offset, limit) {
    return await prisma.upload.findMany({
      skip: Number(offset),
      take: Number(limit),
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Return asset by slug
   * @param {String} slug
   * @returns {Promise<*>}
   */
  static async getAsset(slug) {
    return await prisma.upload.findUnique({
      where: {
        slug,
      },
    });
  }

  /**
   * Create asset
   * @param {Object} asset
   * @returns {Promise<*>}
   */
  static async createAsset(asset) {
    return await prisma.upload.create({
      data: asset,
    });
  }
}

module.exports = databaseService;
