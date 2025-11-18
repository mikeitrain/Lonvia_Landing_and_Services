import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

interface AttachmentListItem {
  id: number | string;
  label?: string;
  metaLeft?: string;
  metaRight?: string;
  typeName?: string;
  showDelete?: boolean;
}

interface AttachmentListProps {
  items: AttachmentListItem[];
  onOpen?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
  openText?: string | ((item: AttachmentListItem) => string);
  deleteText?: string;
  showOpen?: boolean;
  isOpenDisabled?: (item: AttachmentListItem) => boolean;
  workingText?: string;
}

export const AttachmentList: React.FC<AttachmentListProps> = ({ items, onOpen, onDelete, openText = 'Open', deleteText = 'Delete', showOpen = false, isOpenDisabled, workingText = 'Working...' }) => {
  return (
    <div className="space-y-3">
      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={`${item.id}-${index}`} className="bg-neutral-50 rounded-md p-4 flex items-center justify-between border border-border-primary">
            <div className="flex-1">
              <div className="font-medium text-foreground-primary">
                {item.label || `Attachment ${index + 1}`}
              </div>
              {(item.metaLeft || item.metaRight || item.typeName) && (
                <div className="text-sm text-foreground-tertiary flex gap-4">
                  {item.typeName ? <span>{item.typeName}</span> : null}
                  {item.metaLeft ? <span>{item.metaLeft}</span> : null}
                  {item.metaRight ? <span>{item.metaRight}</span> : null}
                </div>
              )}
            </div>
            {(showOpen || item.showDelete) && (
              <div className="flex items-center gap-2">
                {showOpen && onOpen && (
                  <button onClick={() => onOpen(item.id)} disabled={isOpenDisabled ? isOpenDisabled(item) : false} className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-60">
                    {isOpenDisabled && isOpenDisabled(item) ? workingText : (typeof openText === 'function' ? openText(item) : openText)}
                  </button>
                )}
                {item.showDelete && onDelete && (
                  <button onClick={() => onDelete(item.id)} className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors" title={deleteText}>
                    <TrashIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-foreground-tertiary">
          <p className="text-sm">No attachments yet</p>
        </div>
      )}
    </div>
  );
};

export default AttachmentList;


