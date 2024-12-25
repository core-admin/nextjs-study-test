'use client';

/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from 'motion/react';
import { LoremIpsum } from 'react-lorem-ipsum';
import { items } from '@/data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Item({ id }: { id: string }) {
  const { category, title } = items.find(item => item.id === id)!;

  const router = useRouter();
  return (
    <div onClick={() => router.back()}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        style={{ pointerEvents: 'auto' }}
        className="overlay"
      ></motion.div>
      <div className="card-content-container open">
        <motion.div className="card-content" layoutId={`card-container-${id}`}>
          <motion.div className="card-image-container" layoutId={`card-image-container-${id}`}>
            <img className="card-image" src={`/images/${id}.jpg`} alt="" />
          </motion.div>
          <motion.div className="title-container" layoutId={`title-container-${id}`}>
            <span className="category">{category}</span>
            <h2>{title}</h2>
          </motion.div>
          <motion.div className="content-container" animate>
            <LoremIpsum p={6} avgWordsPerSentence={6} avgSentencesPerParagraph={4} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}