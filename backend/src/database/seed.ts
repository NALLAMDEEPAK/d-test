import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { problems } from './schema';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';

dotenv.config();

const mockProblems = [
  {
    id: uuidv4(),
    title: 'Two Sum',
    difficulty: 'Easy',
    topics: JSON.stringify(['Array', 'Hash Table']),
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    youtubeUrl: 'https://www.youtube.com/watch?v=KLlXCFG5TnA',
    starterCode: 'function twoSum(nums, target) {\n  // Your code here\n}',
    solutionCode: 'function twoSum(nums, target) {\n  const map = new Map();\n  \n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    \n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    \n    map.set(nums[i], i);\n  }\n  \n  return [];\n}',
    solutionExplanation: 'We can use a hash map to store the numbers we\'ve seen so far and their indices. For each number, we calculate its complement (target - current number) and check if it exists in our hash map. If it does, we\'ve found our pair.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: JSON.stringify([
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      }
    ]),
    constraints: JSON.stringify([
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ])
  },
  {
    id: uuidv4(),
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topics: JSON.stringify(['Stack', 'String']),
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    youtubeUrl: 'https://www.youtube.com/watch?v=WTzjTskDFMg',
    examples: JSON.stringify([
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ])
  },
  {
    id: uuidv4(),
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    topics: JSON.stringify(['Linked List', 'Recursion']),
    description: 'Merge two sorted linked lists and return it as a sorted list.',
    youtubeUrl: 'https://www.youtube.com/watch?v=XIdigk956u0'
  },
  {
    id: uuidv4(),
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    topics: JSON.stringify(['Array', 'Dynamic Programming', 'Divide and Conquer']),
    description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    youtubeUrl: 'https://www.youtube.com/watch?v=5WZl3MMT0Eg'
  },
  {
    id: uuidv4(),
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    topics: JSON.stringify(['Linked List', 'Math']),
    description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.',
    youtubeUrl: 'https://www.youtube.com/watch?v=wgFPrzTjm7s'
  },
  {
    id: uuidv4(),
    title: 'LRU Cache',
    difficulty: 'Medium',
    topics: JSON.stringify(['Hash Table', 'Linked List', 'Design']),
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
    youtubeUrl: 'https://www.youtube.com/watch?v=7ABFKPK2hD4'
  },
  {
    id: uuidv4(),
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    topics: JSON.stringify(['Array', 'Two Pointers', 'Dynamic Programming', 'Stack']),
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZI2z5pq0TqA'
  },
  {
    id: uuidv4(),
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    topics: JSON.stringify(['Array', 'Binary Search', 'Divide and Conquer']),
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    youtubeUrl: 'https://www.youtube.com/watch?v=q6IEA26hvXc'
  },
  {
    id: uuidv4(),
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    topics: JSON.stringify(['Linked List', 'Divide and Conquer', 'Heap']),
    description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    youtubeUrl: 'https://www.youtube.com/watch?v=kpCesr9VXDA'
  }
];

async function seed() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  const db = drizzle(client);

  console.log('Seeding database...');

  // Insert problems
  for (const problem of mockProblems) {
    await db.insert(problems).values(problem).onConflictDoNothing();
  }

  console.log('Database seeded successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});