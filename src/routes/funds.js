import { Router } from 'express';
import User from '../models/Users.js';
import authenticateJWT from '../middleware/authenticateJWT.js';

const router = Router();

router.post('/save-fund', authenticateJWT, async (req, res) => {
  const { fundId } = req.body;
  if (!fundId) return res.status(400).json({ error: 'fundId required' });

  try {
    await User.findByIdAndUpdate(
      req.user.userId,
      { $addToSet: { savedFunds: fundId } }
    );
    res.json({ message: 'Fund saved' });
  } catch (err) {
    res.status(500).json({ error: 'Could not save fund' });
  }
});

router.get('/saved-funds', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({ savedFunds: user.savedFunds });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch saved funds' });
  }
});

router.delete('/saved-funds/:fundId', authenticateJWT, async (req, res) => {
  const { fundId } = req.params;
  if (!fundId) return res.status(400).json({ error: 'fundId required' });

  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $pull: { savedFunds: fundId } },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'Fund removed', savedFunds: user.savedFunds });
  } catch (err) {
    res.status(500).json({ error: 'Could not remove fund' });
  }
});

export default router;
