'use client';

/* eslint-disable @next/next/no-img-element */
import { items } from '@/data';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';

interface CardProps {
  id: string;
  title: string;
  category: string;
}

export function Card({ id, title, category }: CardProps) {
  return (
    <li className={`card`}>
      <div className="card-content-container">
        <motion.div className="card-content" layoutId={`card-container-${id}`}>
          <motion.div className="card-image-container" layoutId={`card-image-container-${id}`}>
            <img className="card-image" src={`images/${id}.jpg`} alt="" />
          </motion.div>
          <motion.div className="title-container" layoutId={`title-container-${id}`}>
            <span className="category">{category}</span>
            <h2>{title}</h2>
          </motion.div>
        </motion.div>
      </div>
      <Link href={`/document/${id}`} className={`card-open-link`} />
    </li>
  );
}

export function List() {
  return (
    <AnimatePresence>
      <ul className="card-list">
        {items.map(card => (
          <Card key={card.id} {...card} />
        ))}
      </ul>
    </AnimatePresence>
  );
}
