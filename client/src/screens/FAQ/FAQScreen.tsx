import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import ScreenContainer from '../../components/ScreenContainer';
import { getText } from '../../utils/const';

export default function FAQScreen() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = getText('faqScreen.faqs', []);

  return (
    <ScreenContainer>
      <Header showBack />
      <Text style={styles.heading}>{getText('faqScreen.title', '')}</Text>
      <ScrollView>
        <ScrollView>
          {faqs.map((item: any, index: number) => {
            const [question, answer] = Object.entries(item)[0] as [
              string,
              string,
            ];
            const expanded = open === index;

            return (
              <View key={index}>
                <TouchableOpacity
                  style={styles.questionRow}
                  onPress={() => setOpen(expanded ? null : index)}
                >
                  <Text style={styles.question}>{question}</Text>
                  <Text style={styles.arrow}>{expanded ? '▲' : '▼'}</Text>
                </TouchableOpacity>

                {expanded && <Text style={styles.answer}>{answer}</Text>}
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 18, fontWeight: '500', marginBottom: 10 },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  question: {
    fontSize: 16,
    flex: 1,
    paddingRight: 10,
  },
  answer: {
    paddingVertical: 10,
    fontSize: 15,
    color: '#000',
    backgroundColor: '#ddd',
    padding: 5,
  },
  arrow: {
    fontSize: 16,
    color: '#999',
  },
});
