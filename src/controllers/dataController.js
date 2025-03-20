const DataEntry = require('../models/dataEntry');
const logger = require('../utils/logger');

/**
 * Create a new data entry
 * @route POST /data
 */
const createDataEntry = async (req, res, next) => {
  try {
    const { date, data } = req.body;
    
    const dataEntry = await DataEntry.create({
      date,
      data,
      createdBy: req.userEmail,
    });
    
    logger.info(`Data entry created with ID: ${dataEntry.id}`);
    
    return res.status(201).json({
      success: true,
      data: dataEntry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single data entry by ID
 * @route GET /data/:id
 */
const getDataEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const dataEntry = await DataEntry.findById(id);
    
    if (!dataEntry) {
      logger.warn(`Data entry not found with ID: ${id}`);
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Data entry not found',
        },
      });
    }
    
    logger.info(`Data entry retrieved with ID: ${id}`);
    
    return res.status(200).json({
      success: true,
      data: dataEntry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get data entries with optional filtering
 * @route GET /data
 */
const queryDataEntries = async (req, res, next) => {
  try {
    const { startDate, endDate, page, limit } = req.query;
    
    const filter = {};
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    
    const skip = (page - 1) * limit;
    
    const [dataEntries, totalItems] = await Promise.all([
      DataEntry.find(filter)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit),
      DataEntry.countDocuments(filter),
    ]);
    
    const totalPages = Math.ceil(totalItems / limit);
    
    logger.info(`Retrieved ${dataEntries.length} data entries (page ${page} of ${totalPages})`);
    
    return res.status(200).json({
      success: true,
      data: dataEntries,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a data entry
 * @route PUT /data/:id
 */
const updateDataEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { date, data } = req.body;
    
    const dataEntry = await DataEntry.findByIdAndUpdate(
      id,
      { 
        ...(date && { date }),
        data, 
      },
      {
        new: true,
        runValidators: true,
      }
    );
    
    if (!dataEntry) {
      logger.warn(`Data entry not found for update with ID: ${id}`);
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Data entry not found',
        },
      });
    }
    
    logger.info(`Data entry updated with ID: ${id}`);
    
    return res.status(200).json({
      success: true,
      data: dataEntry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a data entry
 * @route DELETE /data/:id
 */
const deleteDataEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const dataEntry = await DataEntry.findByIdAndDelete(id);
    
    if (!dataEntry) {
      logger.warn(`Data entry not found for deletion with ID: ${id}`);
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Data entry not found',
        },
      });
    }
    
    logger.info(`Data entry deleted with ID: ${id}`);
    
    return res.status(200).json({
      success: true,
      message: 'Data entry successfully deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDataEntry,
  getDataEntry,
  queryDataEntries,
  updateDataEntry,
  deleteDataEntry,
}; 