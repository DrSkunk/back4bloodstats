import { useEffect, useState, useRef } from "react";

const cache = new Map();

export function useUsername(uid) {
  const [userNames, setUsernames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
}
