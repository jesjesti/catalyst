import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { TableVirtuoso } from "react-virtuoso";

interface Product {
  id: number;
  name: string;
  price: number;
}

const PAGE_LIMIT = 10;
const MAX_ROWS = 15;

export default function InfiniteScrollTable() {
  const [data, setData] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async (offset: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/products?offset=${offset}&limit=${PAGE_LIMIT}`
      );
      const json = await res.json();
      const newData = json.data || [];

      if (newData.length < PAGE_LIMIT) setHasMore(false);

      setData((prev) => {
        const merged = [...prev, ...newData];
        return merged.slice(-MAX_ROWS);
      });
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(0);
  }, [fetchData]);

  return (
    <Paper style={{ height: "75vh", width: "100%", overflow: "hidden" }}>
      <TableVirtuoso
        data={data}
        endReached={() => {
          if (!loading && hasMore) {
            const nextOffset = offset + PAGE_LIMIT;
            setOffset(nextOffset);
            fetchData(nextOffset);
          }
        }}
        overscan={3}
        fixedHeaderContent={() => (
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        )}
        components={{
          Table: (props) => <Table {...props} stickyHeader />,
          TableHead,
          TableRow,
          TableBody,
        }}
        itemContent={(index, item) => (
          <>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.price}</TableCell>
          </>
        )}
      />
    </Paper>
  );
}
