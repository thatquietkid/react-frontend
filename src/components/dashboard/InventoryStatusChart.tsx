import React from 'react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
}

interface InventoryStatusChartProps {
  inventory: InventoryItem[];
}

const InventoryStatusChart: React.FC<InventoryStatusChartProps> = ({ inventory }) => {
  // Group items by category
  const categories = inventory.reduce((acc, item) => {
    const cat = acc.find(c => c.name === item.category);
    if (cat) {
      cat.count += item.quantity;
    } else {
      acc.push({ name: item.category, count: item.quantity });
    }
    return acc;
  }, [] as { name: string; count: number }[]);

  categories.sort((a, b) => b.count - a.count);
  const total = categories.reduce((sum, c) => sum + c.count, 0);

  const colors = ['#3b82f6', '#14b8a6', '#f59e0b', '#6366f1', '#10b981', '#f43f5e'];

  return (
    <div style={{ width: 400, margin: 'auto', padding: 20, background: '#fff', borderRadius: 8 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', height: 160, gap: 8 }}>
        {categories.map((cat, i) => {
          const percent = total ? (cat.count / total) * 100 : 0;
          const height = Math.max(percent, 5); // min 5% height
          return (
            <div key={cat.name} style={{ flex: 1, textAlign: 'center' }}>
              <div
                title={`${cat.name}: ${cat.count} items (${percent.toFixed(1)}%)`}
                style={{
                  height: `${height}%`,
                  backgroundColor: colors[i % colors.length],
                  borderRadius: '4px 4px 0 0',
                  transition: 'opacity 0.3s',
                }}
                onMouseOver={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseOut={e => (e.currentTarget.style.opacity = '1')}
              />
              <div style={{ marginTop: 6, fontSize: 12, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {cat.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {categories.map((cat, i) => (
          <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: colors[i % colors.length] }} />
            <span style={{ fontSize: 12, color: '#666' }}>{cat.name} ({cat.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const sampleInventory: InventoryItem[] = [
    { id: '1', name: 'Notebook', category: 'Stationery', quantity: 30 },
    { id: '2', name: 'Pen', category: 'Stationery', quantity: 50 },
    { id: '3', name: 'Projector', category: 'Electronics', quantity: 10 },
    { id: '4', name: 'Laptop', category: 'Electronics', quantity: 5 },
    { id: '5', name: 'Chair', category: 'Furniture', quantity: 20 },
    { id: '6', name: 'Desk', category: 'Furniture', quantity: 15 },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#CDEAFF', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <InventoryStatusChart inventory={sampleInventory} />
    </div>
  );
};

export default App;
