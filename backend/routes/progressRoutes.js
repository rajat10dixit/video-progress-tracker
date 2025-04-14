const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');

// Helper functions
function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;
  
  intervals.sort((a, b) => a.start - b.start);
  
  const merged = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const current = intervals[i];
    
    if (current.start <= last.end) {
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push(current);
    }
  }
  
  return merged;
}

function calculateWatchedSeconds(intervals) {
  return intervals.reduce((total, interval) => total + (interval.end - interval.start), 0);
}

// Save or update progress
router.post('/', async (req, res) => {
  try {
    const { userId, videoId, intervals, totalDuration } = req.body;
    
    let progress = await UserProgress.findOne({ userId, videoId });
    
    if (!progress) {
      progress = new UserProgress({
        userId,
        videoId,
        watchedIntervals: intervals,
        totalDuration
      });
    } else {
      const allIntervals = [...progress.watchedIntervals, ...intervals];
      progress.watchedIntervals = mergeIntervals(allIntervals);
      progress.totalDuration = totalDuration;
    }
    
    await progress.save();
    const watchedSeconds = calculateWatchedSeconds(progress.watchedIntervals);
    const percent = (watchedSeconds / progress.totalDuration) * 100;
    
    res.json({
      success: true,
      progress: percent.toFixed(2),
      lastPosition: progress.lastPosition
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get progress
router.get('/:userId/:videoId', async (req, res) => {
  try {
    const progress = await UserProgress.findOne({
      userId: req.params.userId,
      videoId: req.params.videoId
    });
    
    if (!progress) {
      return res.json({
        success: true,
        progress: 0,
        lastPosition: 0
      });
    }
    
    const watchedSeconds = calculateWatchedSeconds(progress.watchedIntervals);
    const percent = (watchedSeconds / progress.totalDuration) * 100;
    
    res.json({
      success: true,
      progress: percent.toFixed(2),
      lastPosition: progress.lastPosition
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update last position
router.put('/lastPosition', async (req, res) => {
  try {
    const { userId, videoId, lastPosition } = req.body;
    
    await UserProgress.findOneAndUpdate(
      { userId, videoId },
      { lastPosition },
      { upsert: true, new: true }
    );
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Make sure to export the router at the end
module.exports = router;