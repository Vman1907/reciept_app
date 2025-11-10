import { Ionicons } from '@react-native-vector-icons/ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  question: string;
  answer: string;
  expanded: boolean;
  onToggle: () => void;
}

export default function FAQItem({
  question,
  answer,
  expanded,
  onToggle,
}: Props) {
  return (
    <View>
      <TouchableOpacity style={styles.row} onPress={onToggle}>
        <View style={styles.questionContainer}>
          <Text
            style={
              expanded
                ? styles.questionMarkerActive
                : styles.questionMarkerInActive
            }
          >
            Q
          </Text>
          <Text style={styles.question}>{question}</Text>
        </View>
        <Text style={styles.icon}>
          {expanded ? (
            <Ionicons name="chevron-up-outline" size={18} color={'#cfcfcf'} />
          ) : (
            <Ionicons name="chevron-down-outline" size={18} color={'#cfcfcf'} />
          )}
        </Text>
      </TouchableOpacity>
      {expanded && <Text style={styles.answer}>{answer}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 14,
  },
  questionContainer: { flexDirection: 'row', gap: 10 },
  questionMarkerInActive: { color: '#00807c', fontSize: 16 },
  questionMarkerActive: { color: '#ffb916', fontSize: 16 },
  question: { fontSize: 16 },
  answer: { color: '#000', padding: 10, backgroundColor: '#ddd' },
  icon: { fontSize: 16 },
});
