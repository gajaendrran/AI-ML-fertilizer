import React, { useState, useEffect } from "react";
import { db } from "../config/firebasecon";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import districts from "../data/Districts";

const DropDown = ({ onBlockSelect }) => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlocks = async () => {
      if (!selectedDistrict) return;

      setLoading(true);
      try {
        const blocksRef = collection(db, "Districts", selectedDistrict, "Blocks");
        const querySnapshot = await getDocs(blocksRef);

        const fetchedBlocks = querySnapshot.docs.map((doc) => doc.id);
        setBlocks(fetchedBlocks);
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
      setLoading(false);
    };

    fetchBlocks();
  }, [selectedDistrict]);

  useEffect(() => {
    const fetchNPKValues = async () => {
      if (!selectedBlock) return;

      try {
        const blockDocRef = doc(db, "Districts", selectedDistrict, "Blocks", selectedBlock);
        const blockDocSnap = await getDoc(blockDocRef);

        if (blockDocSnap.exists()) {
          const { N, P, K } = blockDocSnap.data();
          onBlockSelect({ district: selectedDistrict, block: selectedBlock, N, P, K });
        } else {
          onBlockSelect({ district: selectedDistrict, block: selectedBlock, N: 0, P: 0, K: 0 });
        }
      } catch (error) {
        console.error("Error fetching NPK values:", error);
      }
    };

    fetchNPKValues();
  }, [selectedBlock]);

  return (
    <>
      <select
        className="input"
        required
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
      >
        <option value="">Select District</option>
        {districts.map((district, index) => (
          <option key={index} value={district}>
            {district}
          </option>
        ))}
      </select>

      <select
        className="input"
        required
        disabled={!selectedDistrict || loading}
        value={selectedBlock}
        onChange={(e) => setSelectedBlock(e.target.value)}
      >
        <option value="">Select Block</option>
        {loading ? (
          <option>Loading...</option>
        ) : (
          blocks.map((block) => (
            <option key={block} value={block}>
              {block}
            </option>
          ))
        )}
      </select>
    </>
  );
};

export default DropDown;
